import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Tran_nav.css"
export const useTransitionNavigate = () => {
    const navigate = useNavigate();

    const transitionNavigate = useCallback(
        async (
            newRoute: string,
            transitionClass:
                | "slide-to-left"
                | "slide-to-right" = "slide-to-left"
        ) => {
            if (!document.startViewTransition) {
                return navigate(newRoute);
            }

            document.documentElement.classList.add(transitionClass);

            const transition = document.startViewTransition(() => {
                navigate(newRoute);
            });

            try {
                await transition.finished;
            } finally {
                document.documentElement.classList.remove(transitionClass);
            }

            return;
        },
        [navigate]
    );

    return {
        transitionNavigate,
    };
};
