"use client";

import Image from "next/image";

export function ErrorPage() {
  return (
    <div className="max-w-sm mx-auto w-full p-2">
      <div className="relative aspect-square w-full">
        <Image
          src="/images/error-page.png"
          alt="Image of an error happening"
          fill
        />
      </div>
      <p className="text-xs text-muted text-center">
        <a
          className="hover:underline"
          href="https://www.freepik.com/free-vector/defective-product-abstract-concept-illustration_13450261.htm#fromView=keyword&page=1&position=4&uuid=61191c75-3e57-47ff-8047-3e7285966dcd"
        >
          Image by vectorjuice on Freepik
        </a>
      </p>

      <div className="mt-4">
        <h1 className="text-3xl text-center mb-2">Oops!</h1>
        <p className="text-sm text-center text-muted-foreground">
          An error occured and this page could not be rendered. Please try again
          later.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
