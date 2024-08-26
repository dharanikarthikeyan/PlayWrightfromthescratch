class SetPageExtenstion{
    constructor(page)
    {
        this.page = page;
    }
    
    async SetTextBoxValueByPlaceholder(placeholderName, inputValue)
    {
        await this.page.getByPlaceholder(placeholderName).fill(inputValue);
    }

    async SetTextBoxValueById(textboxId, inputValue){
        await this.page.locator(textboxId).fill(inputValue);
    }

    async SetTextBoxValueByClass(className,inputValue)
    {
        await this.page.locator(className).fill(inputValue);
    }
}

module.exports =SetPageExtenstion;