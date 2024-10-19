

export default function useRandom() {

    const Generate = (max) => {

        return Math.floor(Math.random() * ((max || 100) + 1));
    }


    return { Generate }
}