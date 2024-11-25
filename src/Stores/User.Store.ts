import type { UserStoreProps } from '@/Types/User.Types'
import { toast } from '@lifo123/library/Toast'
import { map } from 'nanostores'

const initialData: UserStoreProps = {
    user: '',
    token: '',
    isLogin: false,
    isPremium: false,
    remainingGames: 1
}

export const _user = map<UserStoreProps>(initialData)


const decrementGames = () => {
    const userData = _user.get();
    if (!userData.isPremium && userData.remainingGames > 0) {
        _user.setKey('remainingGames', userData.remainingGames - 1);
    }
}

const isAvailableToPlay = () => {
    const USER = _user.get()
    if (!USER.isPremium && USER.remainingGames <= 1) {
        toast.error("You have reached the limit of free games. Upgrade to premium to continue playing!");
        return;
    }
}



export const ManageUser = {
    decrementGames, isAvailableToPlay
}