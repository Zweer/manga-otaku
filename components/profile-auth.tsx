"use client"

import * as React from "react"
import { AuthUser, signInWithRedirect, signOut } from "aws-amplify/auth"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Icons } from "@/components/icons"
import { Authenticator } from "@aws-amplify/ui-react"

export function ProfileAuth({ user }: { user?: AuthUser }) {
  console.log(user);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  function signInWithSocial(provider: 'Amazon' | 'Apple' | 'Facebook' | 'Google') {
    return async (event: React.SyntheticEvent) => {
      event.preventDefault();
      setIsLoading(true);

      try {
        await signInWithRedirect({ provider });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  }

  if (!user) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-9 px-0" title="Authenticate">
            <User />
            <span className="sr-only">Authenticate</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Authenticator />
        </DialogContent>
      </Dialog>
    );
  }

  if (!user) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="w-9 px-0" title="Authenticate">
            <User />
            <span className="sr-only">Authenticate</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Social Login</DialogTitle>
            <DialogDescription>Who remembers password nowadays?</DialogDescription>
          </DialogHeader>
          <Button variant="outline" type="button" disabled={isLoading} onClick={signInWithSocial('Google')}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-9 px-0">
          <User />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
