<?php

namespace App\Http\Controllers;

use App\Models\Code;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

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

        $request->validate([
            'name' => 'required|string|max:255|unique:codes,name',
            'description' => 'string|max:255|nullable',
            'points' => 'required|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        $file = $request['image'];

        $filename = $request['name'] . '.webp';
        $path = 'ciphers/' . $filename;

        $manager = ImageManager::usingDriver(Driver::class);

        $image = $manager->decode($file->getRealPath());

        $encoded = $image->encodeUsingFileExtension('webp', 80);

        Storage::disk('public')->put($path, (string) $encoded);

        $publicUrl = Storage::url($path);

        $codice = Str::random(8);

        Code::create([
            'name' => $request['name'],
            'points' => $request['points'],
            'description' => $request['description'],
            'codice' => $codice,
            'image_path' => $publicUrl,
            'active' => true,
        ]);

        return back()->with('success', 'Cifra nahrána');
    }
}
