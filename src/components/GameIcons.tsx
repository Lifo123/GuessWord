const icons = {
    send: <svg height={30} viewBox="0 -1 24 24" fill="none"><g> <path d="M7 12L9.89075 14.8907V14.8907C9.95114 14.951 10.049 14.9511 10.1094 14.8907V14.8907L17 8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>,
    backspace: <svg height={26} viewBox="0 -1 24 24" fill="none"><g><path d="M7.91987 5C7.33602 5 6.78132 5.25513 6.40136 5.69842L2.11564 10.6984C1.47366 11.4474 1.47366 12.5526 2.11564 13.3016L6.40136 18.3016C6.78132 18.7449 7.33602 19 7.91987 19L19 19C20.1046 19 21 18.1046 21 17L21 7C21 5.89543 20.1046 5 19 5L7.91987 5Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"></path><path d="M15 10.0001L11 14.0001" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path><path d="M11 10.0001L15 14.0001" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></g></svg>
} as const;

type IconTypes = keyof typeof icons;

export default function GameIcons({
    id
}: { id: IconTypes }) {
    return (
        icons[`${id}`]
    )
}