export default function AbstractFactoryPage(){
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex">
                <div className="bg-white  w-96 h-96 text-black">
                    1
                </div>
                <div className="bg-base-300/70 w-96 h-96">
                    2
                </div>
            </div>
            <div className="text-black bg-secondary w-full h-96">
                3
            </div>
        </main>
    )
}