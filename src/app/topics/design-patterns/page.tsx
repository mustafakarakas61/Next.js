import Link from "next/link";

export default function DesignPatternsPage() {
    return (
        <main className="flex items-center justify-center min-h-screen py-2">
            <div className="flex">
                <div className="mx-20 w-full">
                    <p className="badge badge-lg badge-outline mt-10 mb-2.5">Creational (Yaratıcı) Design Patterns</p>

                    <ol className="list-decimal">
                        <li>
                            <b>Singleton</b>
                            <p className="mb-1">
                                Bir sınıf için nesne oluşturmayı yalnızca bir örnekle sınırlar.
                            </p>
                        </li>
                        <li>
                            <b>Factory</b>
                            <p className="mb-1">
                                Bir arayüz veya sınıf üzerinden nesne oluşturmayı kolaylaştırır.
                            </p>
                        </li>
                        <li>
                            <b>Abstract Factory</b>
                            <p className="mb-1">
                                İlgili nesneler ailesini oluşturmayı kolaylaştırır ve bu nesnelerin uyumlu çalışmasını
                                sağlar.
                            </p>
                        </li>
                        <li>
                            <b><Link href="/topics/design-patterns/builder">Builder (Oluşturucu)</Link></b>
                            <p className="mb-1">
                                Bir nesnenin karmaşık yapısını adım adım oluşturmayı ve temsil etmeyi sağlar.
                            </p>
                        </li>
                        <li>
                            <b>Prototype (Prototip)</b>
                            <p className="mb-1">
                                Varolan bir nesnenin kopyalarını oluşturmayı ve bu kopyalar üzerinde değişiklik yapmayı
                                sağlar.
                            </p>
                        </li>
                    </ol>
                </div>
                <div className="mx-20 w-full">
                    <p className="badge badge-lg badge-outline mt-10 mb-2.5">Structural (Yapısal) Design Patterns</p>

                    <ol className="list-decimal">
                        <li>
                            <b>Adapter (Bağdaştırıcı)</b>
                            <p className="mb-1">
                                Uyumsuz arabirimlerin birlikte çalışmasına izin vermek için bir arabirimin başka bir mevcut sınıfın arabirimine nasıl değiştirileceği veya uyarlanacağı ile ilgilidir.
                            </p>
                        </li>
                        <li>
                            <b>Composite (Bileşik)</b>
                            <p className="mb-1">
                                Tek bir nesne olarak manipülasyonu desteklemek için bir ağaç yapısından yararlanır.
                            </p>
                        </li>
                        <li>
                            <b>Proxy</b>
                            <p className="mb-1">
                                Erişim kontrolünü etkinleştirmek, maliyeti ve karmaşıklığı azaltmak için bir nesneyi başka bir nesneyle nasıl temsil etmeniz gerektiği ile ilgilidir.
                            </p>
                        </li>
                        <li>
                            <b>Fly Weight</b>
                            <p className="mb-1">
                                Verileri benzer nesnelerle paylaşarak bellek kullanımını en aza indirir.
                            </p>
                        </li>
                        <li>
                            <b>Facade (Cephe)</b>
                            <p className="mb-1">
                                Büyük bir kod gövdesinin kullanımını basitleştirmek için üst düzey bir arabirim tanımlar.
                            </p>
                        </li>
                        <li>
                            <b>Bridge (Köprü)</b>
                            <p className="mb-1">
                                Bir arabirimi uygulamasından ayırma yöntemidir.
                            </p>
                        </li>
                        <li>
                            <b>Decorator (Dekoratör)</b>
                            <p className="mb-1">
                                İşlevselliği dinamik olarak genişletir (ekler veya geçersiz kılar).
                            </p>
                        </li>
                    </ol>
                </div>
                <div className="mx-20 w-full ">
                    <p className="badge badge-lg badge-outline mt-10 mb-2.5">Behavioral (Davranışsal) Design Patterns</p>

                    <ol className="list-decimal">
                        <li>
                            <b>Template Method (Şablon Yöntemi)</b>
                            <p className="mb-1">
                                Alt sınıfların belirli adımları iyileştirmesine izin verirken bir işlemin iskeletini
                                tanımlar.
                            </p>
                        </li>
                        <li>
                            <b>Mediator (Arabulucu)</b>
                            <p className="mb-1">
                                Sınıflar arasındaki basit iletişimi ifade eder.
                            </p>
                        </li>
                        <li>
                            <b>Chain Of Responsibility (Sorumluluk Zinciri)</b>
                            <p className="mb-1">
                                İşleme nesneleri zincirine devredilecek komutlar için bir yöntemdir.
                            </p>
                        </li>
                        <li>
                            <b>Observer (Gözlemci)</b>
                            <p className="mb-1">
                                Diğer nesne(ler)deki değişikliklerin nesnelere nasıl bildirileceğini tanımlar.
                            </p>
                        </li>
                        <li>
                            <b>Strategy (Strateji)</b>
                            <p className="mb-1">
                                Bir sınıf içindeki bir algoritmayı kapsüller.
                            </p>
                        </li>
                        <li>
                            <b>Command (Komut)</b>
                            <p className="mb-1">
                                Bir nesnede bir komut isteğini kapsüller.
                            </p>
                        </li>
                        <li>
                            <b>State (Durum)</b>
                            <p className="mb-1">
                                Aşaması değiştiğinde bir nesnenin davranışı nasıl değiştirilir?
                            </p>
                        </li>
                        <li>
                            <b>Visitor (Ziyaretçi)</b>
                            <p className="mb-1">
                                Sınıfta değişiklik yapmadan sınıf üzerinde yeni bir işlem tanımlar.
                            </p>
                        </li>
                        <li>
                            <b>Iterator (Yineleyici)</b>
                            <p className="mb-1">
                                Koleksiyon öğelerine yinelemeli (sıralı) erişimi destekler.
                            </p>
                        </li>
                        <li>
                            <b>Interpreter (Tercüman)</b>
                            <p className="mb-1">
                                Bir uygulama içinde dil öğelerinin kullanımını destekler.
                            </p>
                        </li>
                        <li>
                            <b>Memento</b>
                            <p className="mb-1">
                                Bir nesnenin dahili/orijinal durumunu kaydetme ve geri yükleme işlemidir.
                            </p>
                        </li>
                    </ol>
                </div>
            </div>
        </main>
    )
}
