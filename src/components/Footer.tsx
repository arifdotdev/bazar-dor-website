import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="mt-20 border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                {/* Footer Top */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Logo & Description */}
                    <div>
                        <Link href="/" className="mb-4 inline-flex items-center gap-2">
                            <Image
                                src="/logo-icon.png"
                                alt="Bazardor logo"
                                width={40}
                                height={40}
                                className="rounded-lg"
                            />
                            <span className="text-2xl font-bold text-gray-900">
                                Bazar<span className="text-green-600">dor</span>
                            </span>
                        </Link>

                        <p className="max-w-xs text-sm leading-7 text-gray-600">
                            বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন
                            সহজেই। প্রতিদিনের বাজারের দামের আপডেট থাকুন একসাথে।
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-base font-bold text-gray-900">
                            দ্রুত লিংক
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <Link href="/" className="transition hover:text-green-600">
                                    হোম
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="transition hover:text-green-600">
                                    সকল পণ্য
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="transition hover:text-green-600">
                                    পণ্যের ক্যাটাগরি
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h3 className="mb-4 text-base font-bold text-gray-900">
                            গুরুত্বপূর্ণ লিংক
                        </h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <Link href="/about" className="transition hover:text-green-600">
                                    আমাদের সম্পর্কে
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="transition hover:text-green-600">
                                    যোগাযোগ
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="transition hover:text-green-600">
                                    প্রাইভেসি পলিসি
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Market Updates */}
                    <div>
                        <h3 className="mb-4 text-base font-bold text-gray-900">
                            বাজারের আপডেট
                        </h3>
                        <p className="text-sm leading-7 text-gray-600">
                            চাল, ডাল, তেল, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের
                            সর্বশেষ দাম জানতে আমাদের সাথেই থাকুন।
                        </p>
                        <Link
                            href="/products"
                            className="mt-4 inline-flex rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                            বাজারদর দেখুন →
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p>
                        © {new Date().getFullYear()} Bazardor. সর্বস্বত্ব সংরক্ষিত।
                    </p>
                    <p>
                        বাংলাদেশের বাজারদর, এক জায়গায়।
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;