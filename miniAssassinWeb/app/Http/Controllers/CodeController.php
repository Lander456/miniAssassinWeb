<?php

namespace App\Http\Controllers;

use App\Models\Code;
use Illuminate\Http\Request;

class CodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $codes = Code::all();
        $activeCodes = $codes->where('active', true);
        $inactiveCodes = $codes->where('active', false);
        return view('codes.index', [
            'activeCodes' => $activeCodes,
            'inactiveCodes' => $inactiveCodes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Code $code)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Code $code)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Code $code)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Code $code)
    {
        $code->delete();

        return redirect()->back()->with('success', 'Cifra znicena :).');
    }

    public function submitCode(Request $request) {
        $validated = $request->validate([
            'code' => 'required|string|max:255|exists:codes,codice',
        ]);

        $submittee = $request->user()->player;

        $submittedCode = Code::where('codice', $validated['code'])->first();

        if ($submittedCode && $submittedCode->active) {
            $submittedCode->update(['active' => false]);
            $submittee->update([
                'points' => $submittee->points + $submittedCode->points
            ]);
        } else {
            abort(403, "NEHALUZ! (anebo se snaž víc, nějak ti to nejde)");
        }
    }

    public function uploadCode(Request $request) {
        ini_set('memory_limit', '512M');

        if (!$request->user()->isAdmin()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:codes,name',
            'points' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5000',
        ]);

        $file = $validated['image'];
        $base64Image = base64_encode($file->get());

        $codice = substr(hash('sha256', $base64Image), 0, 8);

        Code::create([
            'name' => $validated['name'],
            'points' => $validated['points'],
            'codice' => $codice,
            'image_data' => $base64Image,
            'image_mime' => $file->getClientMimeType(),
            'active' => true,
        ]);

        return back()->with('success', 'Cifra nahrána');
    }
}
