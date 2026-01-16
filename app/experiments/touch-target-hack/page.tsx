"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertBody, AlertHeader } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { H1, H2, H3 } from "@/lib/headings";

export default function TouchTargetHackPage() {
  const [showBorder, setShowBorder] = useState(true);
  return (
    <article>
      <div>
        <header className="my-24 text-center">
          <H1 className="text-balance">
            How to ensure your buttons are accessible on mobile
          </H1>
        </header>
      </div>
      <main className="space-y-24">
        <section className="space-y-8">
          <H2>
            No <code>touch-hitbox</code> class
          </H2>
          <p>Hover over each of these buttons, notice anything?</p>
          <div className="mx-auto flex items-center justify-center gap-12 rounded border bg-card py-16 *:scale-200 *:active:scale-194">
            <Button variant="outline" size="icon-xs">
              <ArrowLeftIcon className="size-3" />
            </Button>
            <Button variant="outline" size="icon-xs">
              <ArrowRightIcon className="size-3" />
            </Button>
            <Button variant="outline" size="icon-xs">
              <PlusIcon className="size-3" />
            </Button>
          </div>
          <p>
            You shouldn't, these are regular buttons with a standard touch
            target.
          </p>
        </section>
        <section className="space-y-8">
          <H2>
            <em>With</em> <code>touch-hitbox</code> class
          </H2>
          <p>
            Next, hover over each of these buttons below; which one is
            different? <em>What</em> is different?
          </p>
          <div className="mx-auto flex items-center justify-center gap-12 rounded border bg-card py-16 *:scale-200 *:active:scale-194">
            <Button variant="outline" size="icon-xs" className="touch-hitbox">
              <ArrowLeftIcon className="size-3" />
            </Button>
            <Button variant="outline" size="icon-xs" className="">
              <ArrowRightIcon className="size-3" />
            </Button>
            <Button variant="outline" size="icon-xs" className="">
              <PlusIcon className="size-3" />
            </Button>
          </div>
          <p>
            One of these buttons has a class of <code>touch-hitbox</code> which
            makes it's touch target larger than the other buttons. If you didn't
            notice, hover on the <em>outside</em> of each button and you should
            see what I'm talking about.What is this class doing that allows that
            and why should we care?
          </p>
          <p>Not clear enough? Here's a demo:</p>
          <div className="mx-auto flex items-center justify-center gap-12 rounded border bg-card py-16 *:scale-200 *:active:scale-194">
            <Button
              variant="outline"
              size="icon-xs"
              className="touch-hitbox-demo"
            >
              <ArrowLeftIcon className="size-3" />
            </Button>
            <Button variant="outline" size="icon-xs" className="">
              <ArrowRightIcon className="size-3" />
            </Button>
            <Button variant="outline" size="icon-xs" className="">
              <PlusIcon className="size-3" />
            </Button>
          </div>
          <p>
            See the red border? That's the touch target. The button is the same
            size as the other buttons, but the touch target is larger. What is
            this class doing that allows that and why should we care?
          </p>
          <H3>
            What is <code>touch-hitbox</code> doing?
          </H3>
          <p>
            The <code>touch-hitbox</code> utility class creates a 44x44px
            invisible button <em>behind</em> the button you see. This{" "}
            <code>::before</code> pseudo-element cannot be clicked, but an
            invisible overlay can. This meets WCAG touch target size
            requirements without changing button appearance.
          </p>
          <p>
            This is incredibly useful on mobile devices where your buttons may
            not be large enough to meet those standards, and you don't want to
            ruin your design or layout.
          </p>
          <pre className="rounded bg-secondary p-4 text-sm whitespace-pre-wrap">
            <code>
              {`@utility touch-hitbox {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 44px;
    height: 44px;
    pointer-events: auto;
    background-color: transparent;
    z-index: 9999;
  }
}`}
            </code>
          </pre>
        </section>
        <section className="space-y-8">
          <H2>What if you have multiple buttons close together?</H2>
          <Alert variant="note">
            <AlertHeader />
            <AlertBody>
              This section works best if you can pull this up on your phone or
              tablet.
            </AlertBody>
          </Alert>
          <p>
            While this is okay with a mouse or trackpad, it becomes a problem
            with a touch screen. Not to mention, all of the buttons you've seen
            so far have been scaled to 200% of their normal size. Below are
            examples at their regular size.
          </p>
          <div className="mx-auto flex h-48 flex-col rounded border bg-card p-4">
            <div className="flex h-full flex-col items-center justify-between">
              <div className="flex h-full items-center">
                <Button
                  variant="outline"
                  size="icon-xs"
                  className={cn(
                    "touch-hitbox-demo",
                    !showBorder && "hide-border"
                  )}
                >
                  <ArrowLeftIcon className="size-3" />
                </Button>
                <Button
                  variant="outline"
                  size="icon-xs"
                  className={cn(
                    "touch-hitbox-demo",
                    !showBorder && "hide-border"
                  )}
                >
                  <ArrowRightIcon className="size-3" />
                </Button>
                <Button
                  variant="outline"
                  size="icon-xs"
                  className={cn(
                    "touch-hitbox-demo",
                    !showBorder && "hide-border"
                  )}
                >
                  <PlusIcon className="size-3" />
                </Button>
              </div>
              <div className="mt-auto flex items-center gap-2">
                <label
                  htmlFor="border-toggle"
                  className="text-sm text-foreground/50"
                >
                  Show hitbox border
                </label>
                <Switch
                  id="border-toggle"
                  checked={showBorder}
                  onCheckedChange={setShowBorder}
                />
              </div>
            </div>
          </div>
          <p>
            While you can still click these easily, it's not ideal for your
            mobile users which still accounts for majority of web traffic.
            Across all websites,{" "}
            <strong>
              mobile/touch devices account for 63–65% of all web traffic
            </strong>
            . In certain sectors, like e-commerce, that number is even higher —
            up to 71.8%!
          </p>
          <p>
            If we add some gap to the containing <code>div</code>, suddenly the
            middle button has a much larger area to hit.
          </p>
          <div className="mx-auto flex items-center justify-center gap-4 rounded border bg-card py-16">
            <Button
              variant="outline"
              size="icon-xs"
              className="touch-hitbox-demo"
            >
              <ArrowLeftIcon className="size-3" />
            </Button>
            <Button
              variant="outline"
              size="icon-xs"
              className="touch-hitbox-demo"
            >
              <ArrowRightIcon className="size-3" />
            </Button>
            <Button
              variant="outline"
              size="icon-xs"
              className="touch-hitbox-demo"
            >
              <PlusIcon className="size-3" />
            </Button>
          </div>
          <p>
            As you can see, even though there is still some overlap, you can
            still click and tap the button you want.
          </p>
        </section>
      </main>
    </article>
  );
}
