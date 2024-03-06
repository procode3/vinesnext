import { Portal as _Portal1 } from "@radix-ui/react-portal";

type PortalProps = React.ComponentPropsWithoutRef<typeof _Portal1>;

export interface DialogPortalProps {
    children?: React.ReactNode;
    className?: string;

    /**
     * Specify a container element to portal the content into.
     */
    container?: PortalProps['container'];
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}

export const Portal: React.FC<DialogPortalProps>;
