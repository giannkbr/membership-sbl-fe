import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Built this for coding test in - {siteConfig.name}
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {siteConfig.description} 
          Tech stack used 
          - Backend : Node JS, Nest JS, TypeORM, PostgreSQL
          - Frontend : React ks, Tailwind CSS, Next JS, Shacdn ui
        </p>
      </div>
      <div className="flex gap-4">
         <Button> View Members </Button>
      </div>
    </section>
  )
}
