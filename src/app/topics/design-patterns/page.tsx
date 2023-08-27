import Link from "next/link";

const creationalPatterns = [
    {
        name: "Singleton",
        description: "Bir sınıf için nesne oluşturmayı yalnızca bir örnekle sınırlar.",
        href: "/topics/design-patterns/creational/singleton"
    },
    {
        name: "Factory",
        description: "Bir arayüz veya sınıf üzerinden nesne oluşturmayı kolaylaştırır.",
        href: "/topics/design-patterns/creational/factory"
    },
    {
        name: "Abstract Factory",
        description: "İlgili nesneler ailesini oluşturmayı kolaylaştırır ve bu nesnelerin uyumlu çalışmasını sağlar.",
        href: "/topics/design-patterns/creational/abstract-factory"
    },
    {
        name: "Builder (Oluşturucu)",
        description: "Bir nesnenin karmaşık yapısını adım adım oluşturmayı ve temsil etmeyi sağlar.",
        href: "/topics/design-patterns/creational/builder"
    },
    {
        name: "Prototype (Protitip)",
        description: "Varolan bir nesnenin kopyalarını oluşturmayı ve bu kopyalar üzerinde değişiklik yapmayı sağlar.",
        href: "/topics/design-patterns/creational/prototype"
    },
]

const structuralPatterns = [
    {
        name: "Adapter (Bağdaştırıcı)",
        description: "Uyumsuz arabirimlerin birlikte çalışmasına izin vermek için bir arabirimin başka bir mevcut sınıfın arabirimine nasıl değiştirileceği veya uyarlanacağı ile ilgilidir.",
        href: "/topics/design-patterns/structural/adapter"
    },
    {
        name: "Composite (Bileşik)",
        description: "Tek bir nesne olarak manipülasyonu desteklemek için bir ağaç yapısından yararlanır.",
        href: "/topics/design-patterns/structural/composite"
    },
    {
        name: "Proxy",
        description: "Erişim kontrolünü etkinleştirmek, maliyeti ve karmaşıklığı azaltmak için bir nesneyi başka bir nesneyle nasıl temsil etmeniz gerektiği ile ilgilidir.",
        href: "/topics/design-patterns/structural/proxy"
    },
    {
        name: "Fly Weight",
        description: "Verileri benzer nesnelerle paylaşarak bellek kullanımını en aza indirir.",
        href: "/topics/design-patterns/structural/fly-weight"
    },
    {
        name: "Facade (Cephe)",
        description: "Büyük bir kod gövdesinin kullanımını basitleştirmek için üst düzey bir arabirim tanımlar.",
        href: "/topics/design-patterns/structural/facade"
    },
    {
        name: "Bridge (Köprü)",
        description: "Bir arabirimi uygulamasından ayırma yöntemidir.",
        href: "/topics/design-patterns/structural/bridge"
    },
    {
        name: "Decorator (Dekoratör)",
        description: "İşlevselliği dinamik olarak genişletir (ekler veya geçersiz kılar).",
        href: "/topics/design-patterns/structural/decorator"
    },
]

const behavioralPatterns = [
    {
        name: "Template Method (Şablon Yöntemi)",
        description: "Alt sınıfların belirli adımları iyileştirmesine izin verirken bir işlemin iskeletini tanımlar.",
        href: "/topics/design-patterns/behavioral/template-method"
    },
    {
        name: "Mediator (Arabulucu)",
        description: "Sınıflar arasındaki basit iletişimi ifade eder.",
        href: "/topics/design-patterns/behavioral/mediator"
    },
    {
        name: "Chain Of Responsibility (Sorumluluk Zinciri)",
        description: "İşleme nesneleri zincirine devredilecek komutlar için bir yöntemdir.",
        href: "/topics/design-patterns/behavioral/chain-of-responsibility"
    },
    {
        name: "Observer (Gözlemci)",
        description: "Diğer nesne(ler)deki değişikliklerin nesnelere nasıl bildirileceğini tanımlar.",
        href: "/topics/design-patterns/behavioral/observer"
    },
    {
        name: "Strategy (Strateji)",
        description: "Bir sınıf içindeki bir algoritmayı kapsüller.",
        href: "/topics/design-patterns/behavioral/strategy"
    },
    {
        name: "Command (Komut)",
        description: "Bir nesnede bir komut isteğini kapsüller.",
        href: "/topics/design-patterns/behavioral/command"
    },
    {
        name: "State (Durum)",
        description: "Aşaması değiştiğinde bir nesnenin davranışı nasıl değiştirilir?",
        href: "/topics/design-patterns/behavioral/state"
    },
    {
        name: "Visitor (Ziyaretçi)",
        description: "Sınıfta değişiklik yapmadan sınıf üzerinde yeni bir işlem tanımlar.",
        href: "/topics/design-patterns/behavioral/visitor"
    },
    {
        name: "Iterator (Yineleyici)",
        description: "Koleksiyon öğelerine yinelemeli (sıralı) erişimi destekler.",
        href: "/topics/design-patterns/behavioral/iterator"
    },
    {
        name: "Interpreter (Tercüman)",
        description: "Bir uygulama içinde dil öğelerinin kullanımını destekler.",
        href: "/topics/design-patterns/behavioral/interpreter"
    },
    {
        name: "Memento",
        description: "Bir nesnenin dahili/orijinal durumunu kaydetme ve geri yükleme işlemidir.",
        href: "/topics/design-patterns/behavioral/memento"
    },
]

const designPatterns = [
    {name: "Creational (Yaratıcı) Design Patterns", value: creationalPatterns},
    {name: "Structural (Yapısal) Design Patterns", value: structuralPatterns},
    {name: "Behavioral (Davranışsal) Design Patterns", value: behavioralPatterns},
]

export default function DesignPatternsPage() {
    return (
        <main className="flex items-center justify-center min-h-screen py-2">
            <div className="flex">
                {designPatterns.map((mainItem) => (
                    <div className="mx-20 w-full">
                        <p className="badge badge-lg badge-outline mt-10 mb-2.5">{mainItem.name}</p>
                        <ol className="list-decimal">
                            {mainItem.value.map((item) => (
                                <li>
                                    <b><Link href={item.href}>{item.name}</Link></b>
                                    <p className="mb-1">
                                        {item.description}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
        </main>
    )
}
