import { Button } from "@/components/ui/button";
import Link from "next/link";


export function NavBar() {
    return (
        <div className="flex justify-between p-4">
            <div>
                logo
            </div>
            <div >
                <div className="">
                    <Link href={"/pages/Auth"}>
                    <Button>Login</Button>
                    </Link>
                    
                
                    <Button>⭐ Star a github repo</Button>
                </div>
            </div>
        </div>
    )
}