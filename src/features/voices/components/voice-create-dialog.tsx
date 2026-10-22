"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { toast } from "@/components/ui/toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { VoiceCreateForm } from "./voice-create-form";
import { useCheckout } from "@/features/billing/hooks/use-checkout";

interface VoiceCreateDialogProps {
    children?: React.ReactElement;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function VoiceCreateDialog({ children, open, onOpenChange }: VoiceCreateDialogProps) {
    const isMobile = useIsMobile();

    const { checkout } = useCheckout();

    const handleError = useCallback((message: string) => {
        if (message === "SUBSCRIPTION_REQUIRED") {
            toast.add({
                title: "Subscription required",
                type: "error",
                actionProps: {
                    children: "Subscribe",
                    onClick: () => checkout(),
                },
            });
        } else {
            toast.add({
                title: message,
                type: "error",
            });
        }
    }, [checkout]);

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerTrigger render={children} />
                <DrawerContent>
                    <DrawerHeader className="pb-4">
                        <DrawerTitle className="text-lg font-semibold">
                            Create custom voice
                        </DrawerTitle >
                        <DrawerDescription>
                            Upload or record audio to add a voice.
                        </DrawerDescription>
                    </DrawerHeader>
                    <VoiceCreateForm
                        scrollable
                        onError={handleError}
                        footer={(submit) => (
                            <DrawerFooter>
                                {submit}
                                <DrawerClose render={
                                    <Button variant="outline">
                                        Cancel
                                    </Button>}
                                >
                                </DrawerClose>
                            </DrawerFooter>
                        )}
                    />
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger render={children} />
            <DialogContent className="flex min-h-0 max-h-[calc(100dvh-2rem)] flex-col overflow-hidden sm:max-w-lg">
                <DialogHeader className="text-left">
                    <DialogTitle className="text-lg font-semibold">
                        Create custom voice
                    </DialogTitle>
                    <DialogDescription>
                        Upload or record an audio sample to add a new voice to your library.
                    </DialogDescription>
                </DialogHeader>
                <VoiceCreateForm scrollable onError={handleError} />
            </DialogContent>
        </Dialog>
    );
}
