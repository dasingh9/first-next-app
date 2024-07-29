import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import Image from "next/image";

export default async function Profile() {

    const session = await getServerSession(options);

    const name = <span>{session?.user.name}</span>;
    const email = <span>{session?.user.email}</span>;

    let profileImage = null;
    if (session?.user.image)
        profileImage = <Image src={session.user.image} alt="Profile image" width={100} height={100}></Image>;

    return (
        <div>
            {profileImage && <div>{profileImage}</div>}
            <h1>Hello, {name} </h1>
            <div>
                <h4>Email: {email} </h4>
            </div>
        </div>
    )
}