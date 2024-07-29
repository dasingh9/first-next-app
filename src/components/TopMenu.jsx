import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { options } from "../app/api/auth/[...nextauth]/options";
import Image from "next/image";

export default async function TopMenu() {
    const session = await getServerSession(options);

    let profileImage = null;
    console.log(session);
    if(session?.user.image)
      profileImage = <Image src={session.user.image} alt="Profile image" width={30} height={30}></Image>;

    return (
        <div className="top-menu-bar">
            <Link href="./">Home</Link>
            <Link href="./dashboard">Dashboard</Link>
            <Link href="./about">About</Link>

            {profileImage && <Link href="./profile">{profileImage}</Link>}
            
        </div>
    )
}