"use client"

import {Fragment, useEffect, useState} from 'react'
import {Dialog, Disclosure, Popover, Transition} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    Square3Stack3DIcon,
    SparklesIcon
} from '@heroicons/react/24/outline'
import {
    BriefcaseIcon,
    ChevronDownIcon, CodeBracketIcon,
    CodeBracketSquareIcon,
    PhoneIcon,
    PlayCircleIcon
} from '@heroicons/react/20/solid'
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Image from "next/image";

const topics = [
    {
        name: 'Design Patterns',
        description: 'Yazılımın geliştirme aşamasındaki yeni bir senaryoda sorunun nasıl çözüleceğini bilmek için kullanılan bir şablon yöntemidir. Bu tasarım kalıplarını takip etmek, çeşitli geliştirme problemlerini çözmenize yardımcı olabilir.',
        href: '/topics/design-patterns',
        icon: Square3Stack3DIcon
    },
    {
        name: 'SOLID Prensipleri',
        description: 'Geliştirilen yazılımın esnek, yeniden kullanılabilir, sürdürülebilir ve anlaşılır olmasını sağlayan, kod tekrarını önleyen ve Robert C. Martin tarafından öne sürülen prensipler bütünüdür.',
        href: '/topics/solid-principles',
        icon: SparklesIcon
    },
    {name: 'Core Java', description: 'Temel Java', href: '#', icon: CodeBracketSquareIcon},
    {
        name: 'Advance Java - Spring Framework',
        description: 'İleri Seviye Java - Spring Framework (Boot, Config, Security, ...)',
        href: '#',
        icon: CodeBracketIcon
    },
    {name: 'Automations', description: 'This is automations', href: '#', icon: ArrowPathIcon},
]
const callsToAction = [
    {name: 'YouTube', href: '#', icon: PlayCircleIcon},
    {name: 'LinkedIn', href: '#', icon: BriefcaseIcon},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Header() {
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true);

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            router.push("/login")
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoggedIn(false)
            console.log("data null")
            setData(null)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get('/api/users/me')
                setData(res.data.data.username)
                setIsLoggedIn(true)
            } catch (error) {
                try {
                    await axios.get("/api/users/logout")
                } catch (error) {
                    console.error(error)
                    console.log("yes data null")
                    setData(null)
                } finally {
                    setIsLoggedIn(false)
                    setData(null)
                }
            }finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [])

    return (
        <header className="bg-white shadow-md w-full">
            <nav className="flex h-20 mx-auto max-w-7xl items-center justify-between lg:px-8 lg:gap-x-12"
                 aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">My Company</span>
                        <img className="h-8 w-auto"
                             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="my img"/>
                    </a>
                </div>

                <div className="flex lg:hidden">
                    <button type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>

                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <Popover.Button
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Konular
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {topics.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                        >
                                            <div
                                                className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                           aria-hidden="true"/>
                                            </div>
                                            <div className="flex-auto">
                                                <Link href={item.href} className="block font-semibold text-gray-900">
                                                    {item.name}
                                                    <span className="absolute inset-0"/>
                                                </Link>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                    {callsToAction.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                                        >
                                            <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true"/>
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Özellikler
                    </a>
                    <a href="/customers" className="text-sm font-semibold leading-6 text-gray-900">
                        Kullanıcılar
                    </a>
                    <a href={`/profile/${data}`} className="text-sm font-semibold leading-6 text-gray-900">
                        Profilim
                    </a>
                    <a href={`/about`} className="text-sm font-semibold leading-6 text-gray-900">
                        Hakkında
                    </a>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isLoading ? (
                        <span className="text-black loading loading-ball loading-sm"></span>
                    ) : (
                        data !== null ? (
                            <a onClick={logout} href="#" className="text-sm font-semibold leading-6 text-gray-900">
                                Çıkış Yap <span aria-hidden="true">&#128682;</span>
                            </a>
                        ) : (
                            <div>
                                <a href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                                    Giriş Yap
                                </a>{" "}
                                &nbsp;<span className="text-primary">|</span> &nbsp;
                                <a href="/signup" className="text-sm font-semibold leading-6 text-gray-900">
                                    Kayıt Ol
                                </a>
                            </div>
                        )
                    )}
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10"/>
                <Dialog.Panel
                    className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">My Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="my img"
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    {({open}) => (
                                        <>
                                            <Disclosure.Button
                                                className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Product
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className={"mt-2 space-y-2"}>
                                                {[...products, ...callsToAction].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}

                                </Disclosure>
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </Link>
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </Link>
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </Link>
                            </div>
                            <div className="py-6">
                                {isLoggedIn ? (
                                    <Link onClick={logout} href="#"
                                          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Çıkış
                                    </Link>
                                ) : (
                                    <Link href="/login"
                                          className="text-sm font-semibold leading-6 text-gray-900">
                                        Giriş Yap <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}