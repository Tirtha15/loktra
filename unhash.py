def unhash(hashedString):
    letters = "acdegilmnoprstuw"
    revString='';
    while(hashedString > 7):
        rem = hashedString%37
        #revString.append(letters[rem]);
        revString = letters[rem]+revString;
        hashedString = hashedString/37;
    return revString
    
