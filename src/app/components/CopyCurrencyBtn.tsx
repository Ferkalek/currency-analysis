import { useState } from "react";
import { Button } from "primereact/button";

export const CopyCurrencyBtn = (currency: string) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    
    const copyToClipboard = (text: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
            .then(() => {
                setIsCopied(true);
                // Повертаємо іконку назад до стану "copy" через 1.5 секунди
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch(err => console.error('Не вдалося скопіювати текст: ', err));
        } else {
            // Fallback для старих браузерів
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                setIsCopied(true);
                // Повертаємо іконку назад до стану "copy" через 1.5 секунди
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            } catch (err) {
                console.error('Не вдалося скопіювати текст: ', err);
            }
            
            document.body.removeChild(textArea);
        }
    };

    return (
        <>
            <span className="flex align-items-center">
                <span className="mr-2">{currency}</span>
                <Button 
                    icon={isCopied ? "pi pi-check" : "pi pi-copy"}
                    severity={isCopied ? "success" : "secondary"}
                    className="p-button-text px-2 py-1" 
                    onClick={(e) => {
                        e.stopPropagation(); // Змінено з preventDefault на stopPropagation
                        copyToClipboard(currency);
                    }}
                    aria-label="Copy currency"
                />
            </span>
        </>
    );
};