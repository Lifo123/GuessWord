import { atom } from 'nanostores';

export const $isAsideOpen = atom(false);

const toggle = () => {
    $isAsideOpen.set(!$isAsideOpen.get());
}

$isAsideOpen.subscribe((value) => {
    const sideBar = document.getElementById('aside-app')
    if (value) {
        sideBar?.classList.add('active')
    } else {
        sideBar?.classList.remove('active')
    }
})


export const ManageAside = {
    toggle
}