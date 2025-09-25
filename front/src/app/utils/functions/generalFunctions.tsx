export const isOtherOption = (value: number | string, id: number | string) =>
    value === id

export const getCep = async (cep: string) => {
    const cleanedValue = cep.replace(/\D/g, '')

    try {
        const response = await fetch(
            `https://viacep.com.br/ws/${cleanedValue}/json/`
        )
        const data = await response.json()

        if (data) {
            return data
        } else {
            return { erro: 'true' }
        }
    } catch (error) {
        return { erro: 'true' }
    }
}
