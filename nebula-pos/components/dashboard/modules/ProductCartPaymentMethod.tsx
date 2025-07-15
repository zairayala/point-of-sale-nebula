import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dispatch, SetStateAction } from "react"

export default function ProductCartPaymentMethod({ setMethod }: { setMethod: Dispatch<SetStateAction<string>> }) {
    return (
        <div>
            <p className="text-sm font-medium mb-2">Método de pago</p>
            <RadioGroup defaultValue="cash" className="grid grid-cols-3 gap-4" onValueChange={setMethod}>
                <div>
                    <RadioGroupItem
                        value="cash"
                        id="card"
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor="card"
                        className="flex font-normal flex-col items-center justify-between rounded-md cursor-pointer border  bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                        <div className="w-6 h-6 mb-1 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 17C2 15.8954 2.89543 15 4 15H20C21.1046 15 22 15.8954 22 17V20C22 21.1046 21.1046 22 20 22H4C2.89543 22 2 21.1046 2 20V17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 15V9.00001C6 7.89544 6.89543 7.00001 8 7.00001H16C17.1046 7.00001 18 7.89544 18 9.00001V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 7V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 11H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        Cash
                    </Label>
                </div>
                <div>
                    <RadioGroupItem
                        value="credit_card"
                        id="paypal"
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor="paypal"
                        className="flex font-normal flex-col items-center justify-between rounded-md cursor-pointer border  bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                        <div className="w-6 h-6 mb-1 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 10H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7 15H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        Credit Card
                    </Label>
                </div>
                <div>
                    <RadioGroupItem
                        value="movil"
                        id="apple"
                        className="peer sr-only"
                    />
                    <Label
                        htmlFor="apple"
                        className="flex font-normal flex-col items-center justify-between rounded-md cursor-pointer border  bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary "
                    >
                        <div className="w-6 h-6 mb-1 flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        Movil
                    </Label>
                </div>
            </RadioGroup>
        </div>
    )
}



