function generatePassword() {
    const length = 10; // Choisissez la longueur totale souhaitée
    const charsetUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charsetLower = 'abcdefghijklmnopqrstuvwxyz';
    const charsetNumber = '0123456789';
    const charsetSpecial = '@#$%^&+=!-_.*';

    // Générer un caractère de chaque type
    const randomUpper = charsetUpper.charAt(Math.floor(Math.random() * charsetUpper.length));
    const randomLower = charsetLower.charAt(Math.floor(Math.random() * charsetLower.length));
    const randomNumber = charsetNumber.charAt(Math.floor(Math.random() * charsetNumber.length));
    const randomSpecial = charsetSpecial.charAt(Math.floor(Math.random() * charsetSpecial.length));

    // Remplir le reste du mot de passe
    const remainingLength = length - 4; // 4 caractères sont déjà générés
    const remainingCharset = charsetUpper + charsetLower + charsetNumber + charsetSpecial;
    let remainingChars = '';
    for (let i = 0; i < remainingLength; i++) {
        remainingChars += remainingCharset.charAt(Math.floor(Math.random() * remainingCharset.length));
    }

    // Mélanger tous les caractères
    const password = randomUpper + randomLower + randomNumber + randomSpecial + remainingChars;
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

module.exports = generatePassword;