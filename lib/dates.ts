export const timeAgo = (date: Date) => {
    const deltaDays = -(date.getTime() - Date.now()) / (1000 * 3600 * 24)
    const deltaWeeks = deltaDays / 7
    const deltaMonths = deltaDays / 30
    const deltaYears = deltaDays / 365
    let result
    if (deltaDays < 1.5) {
        result = 'yesterday'
    } else if (deltaDays < 7) {
        result = `${Math.round(deltaDays)} days ago`
    } else if (deltaWeeks < 4) {
        result = `${Math.round(deltaWeeks)} weeks ago`
    } else if (deltaMonths < 12) {
        result = `${Math.round(deltaMonths)} months ago`
    } else {
        result = `${Math.round(deltaYears)} years ago`
    }
    return result
}

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
}

export const formatDateYear = (date: string) => {
    const showYear = new Date(date).getFullYear() !== new Date().getFullYear()
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        ...(showYear && { year: 'numeric' })
    })
    return formattedDate
}
