import { useCallback, useState } from "react";
import { ConfirmDialog, type ConfirmDialogProps } from "@/components/admin/ConfirmDialog";

type ConfirmOptions = Pick<
  ConfirmDialogProps,
  "title" | "description" | "confirmLabel" | "cancelLabel" | "variant"
>;

export function useConfirmDialog() {
  const [state, setState] = useState<{
    options: ConfirmOptions;
    resolve: (confirmed: boolean) => void;
  } | null>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setState({ options, resolve });
    });
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open && state) {
      state.resolve(false);
      setState(null);
    }
  };

  const handleConfirm = async () => {
    state?.resolve(true);
    setState(null);
  };

  const dialog = (
    <ConfirmDialog
      open={state !== null}
      onOpenChange={handleOpenChange}
      title={state?.options.title ?? ""}
      description={state?.options.description ?? ""}
      confirmLabel={state?.options.confirmLabel}
      cancelLabel={state?.options.cancelLabel}
      variant={state?.options.variant}
      onConfirm={handleConfirm}
    />
  );

  return { confirm, dialog };
}
