export {};

declare global {
    namespace controllerApi{
        function setAxis (value: number): void;
        function init (): Error | null;
    }
}