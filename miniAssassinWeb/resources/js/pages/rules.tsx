import { Head, Link } from '@inertiajs/react';

export default function Rules() {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Pravidla" />

            <div className="mx-auto max-w-3xl">
                <div className="mb-10 text-center">
                    <Link
                        href="/"
                        className="mb-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                        &larr; Zpět na hlavní stránku
                    </Link>
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">
                        Pravidla hry
                    </h1>
                    <p className="text-lg text-gray-500">
                        V miniAssassinu (stejně jako v tom velkém, dospěláckém)
                        je veškeré násilí zapovězeno. Stejně tak se prosím řiďme
                        základním pravidlem a to nebuď kretén.
                    </p>
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                        <div className="space-y-10 p-8 sm:p-10">
                            <section className="flex flex-col gap-4 text-left sm:gap-6">
                                <div>
                                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                                        1. Základní princip
                                    </h2>
                                    <p className="leading-relaxed text-gray-600">
                                        <p>
                                            V miniAssassinu každý hráč
                                            reprezentuje jednoho aktéra v
                                            Brněnském podsvětí pracujícího pro
                                            novopečenou společnost Aeronautica
                                            Fenomenale.
                                            Cílem každého hráče je akumulovat
                                            skrz dobu trvání hry co nejvíce
                                            bodů. Tyto body může získávat za
                                            plnění úkolů a zabíjení ostatních
                                            hráčů.
                                        </p>
                                        <p>
                                            Při registraci je požadováno, aby
                                            hráč do systému nahrál svou
                                            fotografii, tato fotografie bude
                                            využita pouze k herním účelům, na
                                            webu hry bude sloužit k tomu, aby
                                            jej ostatní hráči měli podle čeho
                                            rozeznat od nevinných civilistů.
                                            Proto prosíme, aby fotografie,
                                            kterou do systému nahrajete
                                            neobsahovala přílišné maskování, či
                                            byla příliš zastaralá. Pokud
                                            organizátoři při úvodním setkání
                                            seznají fotografii hráče v systému
                                            jako nevyhovující, vyhrazují si
                                            právo na místě pořídit a do systému
                                            nahrát novou. Hráčské fotografie
                                            budou po skončení hry (tedy po 20:00
                                            7.8. 2026) neprodleně ze systému
                                            smazány.
                                        </p>
                                        <p>
                                            Hra se odehrává na území centra
                                            města Brna a parku v okolí hradu
                                            Špilberk. Centrem města Brna se
                                            rozumí území obkroužené šalinovou
                                            dráhou.
                                        </p>
                                        <p>
                                            Hra bude probíhat v pátek 7.8. 2026
                                            mezi 17:00 - 20:00, hráči budou včas
                                            skrze discord v zápatí webu hry a
                                            skrze web samotný, informováni
                                            ohledně místa a času srazu před
                                            začátkem hry pro vyjasnění nejistot
                                            v pravidlech a herních systémech a
                                            pro kontrolu fotografií v systému a
                                            případnému pořízení nových, lépe
                                            reprezentujících dané hráče.
                                        </p>
                                    </p>
                                </div>
                                <div>
                                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                                        2. Vražda
                                    </h2>
                                    <p className="mb-3 leading-relaxed text-gray-600">
                                        <span className="text-xl font-bold text-red-700">
                                            VRAŽDA V MINIASSASSINU (stejně jako
                                            v tom velkém, dospěláckém) PROBÍHÁ
                                            ZÁSADNĚ A VŽDY SYMBOLICKY.
                                        </span>
                                        <p>
                                            Nástrojem, jimž se vražda provádí,
                                            je běžný zubní kartáček. Je zakázáno
                                            používat elektrické nebo nadrozměrné
                                            kartáčky a takové, kterými je možno
                                            oběť zranit.
                                        </p>
                                        <ul className="list-disc space-y-2 pl-5 text-left text-gray-700">
                                            <li>
                                                Platná je pouze taková vražda,
                                                při níž se vrah k oběti v dané
                                                chvíli překvapivě přiblíží
                                                zezadu a přejede jí kartáčkem po
                                                přední části krku. Překvapivé
                                                přiblížení je takové, při němž
                                                oběť nijak nestihne odvrátit
                                                útok například odvrácením ruky
                                                útočníka nebo otočením se.
                                            </li>
                                            <li>
                                                Oběť se ke svému potenciálnímu
                                                vrahovi neotáčí cíleně zády,
                                                jinak je vražda platná.
                                            </li>
                                            <li>
                                                Platná je rovněž vražda, pokud
                                                má oběť na krku šálu, vysoký
                                                límec a podobně.
                                            </li>
                                            <li>
                                                Pokud oběť spí, je platná i
                                                vražda provedená zepředu.
                                            </li>
                                            <li>
                                                Vrah své oběti nesmí znemožňovat
                                                nebo znesnadňovat pohyb.
                                            </li>
                                            <li>
                                                Vraždu může provést pouze ten
                                                hráč, který je živý.
                                            </li>
                                            <li>
                                                Smluvená vražda je nepřípustná.
                                            </li>
                                        </ul>
                                        <p>
                                            Platná vražda tedy splňuje
                                            následující podmínky: Je překvapivá,
                                            byla provedena zezadu (tj. tam kam
                                            se obět zrovna nedívá), obět byla
                                            zasažena zhruba v oblasti krku a
                                            oběť nestihla odvrátit útok (např.
                                            odvrácením ruky apod.). Výjimku
                                            tvoří vražda ve spánku a výše
                                            uvedený seznam okolností vylučující
                                            platnost.
                                        </p>
                                        <p>
                                            Po platně provedené vraždě má oběť
                                            povinnost svému vrahovi ukázat své
                                            codice (tedy kód potřebný k zabití
                                            oběti skrze web) a to pomocí
                                            rozkliknutí svého uživatelského
                                            jména na webu.
                                        </p>
                                        <p>
                                            Vrah není po činu chráněn imunitou,
                                            oběť je povinna ho následovat na jím
                                            zvolené blízké bezpečné místo k
                                            vyřízení formálních náležitostí
                                            činu. V případě bezprostřední
                                            následnosti několika vražd jsou
                                            formální náležitosti vyřešeny
                                            postupně v pořadí, v jakém nastaly.
                                        </p>
                                        <p>
                                            Vrah má povinnost bez zbytečného
                                            odkladu zadat vraždu do informačního
                                            systému, a to přes formulář na
                                            stránkách hry.
                                        </p>
                                    </p>
                                </div>
                                <div>
                                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                                        3. Smrt
                                    </h2>
                                    <p className="mb-3 leading-relaxed text-gray-600">
                                        <p>Smrtí pro hráče hra nekončí.</p>
                                        <p>
                                            Pokud je hráč zabit, na 10 minut je
                                            mu odepřena možnost zabíjet, být
                                            zabit a plnit úkoly, v tomto čase se
                                            ovšem může volně pohybovat skrze
                                            herní prostor.
                                        </p>
                                        <p>
                                            Po uběhnutí 10 minut od úmrtí hráče
                                            je hráč oživen, může znovu vraždit,
                                            být zavražděn a plnit úkoly.
                                        </p>
                                    </p>
                                </div>
                                <div>
                                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                                        4. Spory
                                    </h2>
                                    <p className="mb-3 leading-relaxed text-gray-600">
                                        <p>
                                            Jakoukoliv spornou situaci se Hráči
                                            pokusí nejprve vyřešit na místě.
                                            Řešení se účastní pouze oběť s
                                            potenciálním vrahem a očitými
                                            svědky. Žádný další popis nebo
                                            rekonstrukce nedokáže být tak
                                            věrohodná jako bezprostředně po
                                            vraždě.
                                        </p>
                                        <p>
                                            Při technických nesrovnalostech,
                                            například ohledně pravidel, se Hráči
                                            obracejí na organizátory hry. Takto
                                            mohou učinit buď skrze Discord v
                                            zápatí webu hry, či skrze telefonní
                                            číslo v zápatí webu hry.
                                        </p>
                                        <p>
                                            Pokud nejsou Hráči schopni dojít ke
                                            shodnému závěru, kontaktují organizátory
                                            a <strong>vyčkají</strong> na verdikt.
                                            V tomto čase nejasnosti ohledně zabití
                                            vrah <strong>nezadává</strong> do
                                            systému codice oběti.
                                        </p>
                                    </p>
                                </div>
                                <div>
                                    <h2 className="mb-2 text-xl font-bold text-gray-900">
                                        5. Metaotázky a jejich odpovědi
                                    </h2>
                                    <p className="mb-3 leading-relaxed text-gray-600">
                                        <p>
                                            Pokud je hráč dotázán, zda se účastní
                                            miniassassina, jeho odpověď musí být
                                            pravdivá.
                                        </p>
                                        <p>
                                            Pokud je hráč dotázán na svůj status
                                            v rámci hry (živý, či mrtvý), taktéž
                                            musí odpovědět pravdivě.
                                        </p>
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
