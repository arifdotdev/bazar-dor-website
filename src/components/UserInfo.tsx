import Link from 'next/link';

const UserInfo = () => {
    return (
        <div className="flex items-center gap-3 text-sm">
            
                <div>
                    <Link href={"/signin"}>
                        <button className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700">
                            সাইন ইন
                        </button>
                    </Link>
                    <Link href={"/signup"}>
                        {" "}
                        <button className="btn  bg-red-700 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-red-800">
                            সাইন আপ
                        </button>
                    </Link>
                </div>
        </div>
    );
};

export default UserInfo;