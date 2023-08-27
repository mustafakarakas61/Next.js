import Image from "next/image";

export default function BuilderPage() {

    return (
        <main className="flex items-center justify-center min-h-screen py-2">
            <div className="flex flex-col">
                <div className="text-center w-full">
                    <p className="badge badge-lg text-2xl badge-outline p-5 mt-10">Creational (Yaratıcı) Design
                        Patterns</p>
                </div>
                <div className="w-full">
                    <p className="text-4xl text-center p-5  mb-2.5">Builder (Oluşturucu) Pattern</p>
                </div>
                <div className="w-full text-center text-2xl mb-3">
                    Karmaşık nesnelerin adım adım oluşturulduğu yaratımsal bir tasarım desenidir.
                </div>

                <div className="bg-white rounded-sm p-4 border-4 text-black font-semibold flex flex-col min-h-screen">
                    <div className="w-full flex">
                        <div>
                            Örnek 1
                            <Image
                                src="/builderCode00.png"
                                alt="Java"
                                width={700}
                                height={910}
                                className="rounded-lg border-4 border-amber-600"
                            />
                        </div>
                        &nbsp;
                        <div>
                            <div>
                                Kullanım
                                <Image
                                    src="/builderCode01.png"
                                    alt="Java"
                                    width={700}
                                    height={318}
                                    className="rounded-lg border-4 border-amber-600"
                                />
                            </div>
                            <div className="mt-2">
                                Çıktı
                                <Image
                                    src="/builderCode02.png"
                                    alt="Java"
                                    width={700}
                                    height={318}
                                    className="rounded-lg border-4 border-amber-600"
                                />
                            </div>
                        </div>
                    </div>
                    <hr className="mt-10 -mb-4"/>
                    <div className="w-full flex pt-10">
                        <div className="">
                            Örnek 2
                            <Image
                                src="/builderCode10.png"
                                alt="java"
                                width={700}
                                height={910}
                                className="rounded-lg border-4 border-amber-600"
                            />
                        </div>
                        &nbsp;
                        <div>
                            <div>
                                Kullanım
                                <Image
                                    src="/builderCode11.png"
                                    alt="Java"
                                    width={700}
                                    height={318}
                                    className="rounded-lg border-4 border-amber-600"
                                />
                            </div>
                            <div className="mt-2">
                                Çıktı
                                <Image
                                    src="/builderCode12.png"
                                    alt="Java"
                                    width={700}
                                    height={318}
                                    className="rounded-lg border-4 border-amber-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}