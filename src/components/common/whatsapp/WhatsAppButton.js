import { useRouter } from 'next/router'
import { WhatsappLogoIcon } from '@phosphor-icons/react'

const PHONE = '918487878210'
const PREFILLED_MESSAGE = "Hi Zyden, I'd like to discuss a project."

// Hide on these routes (user is already in touch)
const HIDE_ON = ['/contact']

function WhatsAppButton() {
    const router = useRouter()

    if (HIDE_ON.includes(router?.pathname)) return null

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`

    return (
        <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Chat with Zyden on WhatsApp'
            className='whatsapp-fab fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 group'
        >
            {/* Outer pulse ring */}
            <span className='absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping pointer-events-none' />

            {/* Button */}
            <span className='relative w-14 h-14 md:w-[58px] md:h-[58px] rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.45)] group-hover:scale-105 transition-transform duration-200'>
                <WhatsappLogoIcon size={30} weight='fill' className='text-white' />
            </span>

            {/* Desktop tooltip */}
            <span className='hidden md:flex absolute right-full top-1/2 -translate-y-1/2 mr-3 items-center gap-2 px-3.5 py-2 rounded-full bg-[#0C121D] text-white !text-[13px] font-medium whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-[0_8px_24px_rgba(0,0,0,0.18)]'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse' />
                Chat on WhatsApp
                {/* Tail */}
                <span
                    className='absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#0C121D]'
                />
            </span>
        </a>
    )
}

export default WhatsAppButton
