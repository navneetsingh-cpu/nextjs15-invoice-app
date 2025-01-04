import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center h-screen gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Create Invoice</h1>
      </div>

      <form className="grid gap-4 max-w-xs">
        <div className="block font-semibold text-sm mb-2">
          <Label htmlFor="name">Billing Name</Label>
          <Input id="name" name="name" type="text" />
        </div>
        <div className="block font-semibold text-sm mb-2">
          <Label htmlFor="email">Billing Email</Label>
          <Input id="email" name="email" type="email" />
        </div>

        <div className="block font-semibold text-sm mb-2">
          <Label htmlFor="value">Value</Label>
          <Input id="value" name="value" type="text" />
        </div>

        <div className="block font-semibold text-sm mb-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description"></Textarea>
        </div>

        <div>
          <Button className="w-full font-semibold">Submit</Button>
        </div>
      </form>
    </main>
  );
}
