import Image from 'next/image'
export default function Logo() {
    return (
        <div className='relative w-full h-full '>
        <Image
            fill
            quality={50}
            src={'/logo.png'}
            alt='Logo de empresa'
            className="object-contain shadow-md shadow-purple-500/30 rounded-4xl h-[95%]!"
        ></Image>

        </div>
    )
}
