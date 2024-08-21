import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Tran_nav.css";
import { JSONType } from "../../../Types/VFTypes";
export const useTransitionNavigate = () => {
    const navigate = useNavigate();
    const transitionNavigate = useCallback(
        async (
            newRoute: string,
            state?: any,
            transitionClass:
                | "slide-to-left"
                | "slide-to-right" = "slide-to-left"
        ) => {
            if (window.location.hash == `#/${newRoute}`) return;
            if (!document.startViewTransition) {
                return navigate(newRoute, { state: { result: state } });
            }
            document.documentElement.classList.add(transitionClass);
            const transition = document.startViewTransition(() => {
                navigate(newRoute, { state: { result: state } });
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
