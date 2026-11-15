import HeroActionGroup from '../ui/HeroActionGroup'
import heroImg from '../../assets/images/hero-img.jpeg'
import { CiForkAndKnife } from "react-icons/ci";

import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router'

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-screen py-32 px-15">
      <div>
        <h1 className='font-bold text-3xl lg:text-6xl '>
          نحلّل آراء الزوار، ونختصر عليك الوقت والجهد
        </h1>

        <p className='mt-2'>
          لتختار المكان الأنسب لك.
        </p>

        <div className='flex flex-col gap-3 mt-5'>
          <HeroActionGroup
            icon={<CiSearch size={15} className='text-white' />}
            text="ابحث عن مكانك"
          />
          <HeroActionGroup
            icon={<CiSearch size={15} className='text-white' />}
            text="افهم آراء الزوار"
          />
          <HeroActionGroup
            icon={<CiSearch size={15} className='text-white' />}
            text="اختر بثقة"
          />
        </div>
        <Link to='' className="bg-accent text-white flex justify-center items-center h-13 w-40 rounded-lg mt-7">
          ابدأ الاستكشاف
        </Link>
      </div>
      <div
        className='hidden lg:flex flex-col justify-between rounded-lg p-5'
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='p-10'>
          <CiForkAndKnife size={20} className='text-white' />
        </div>
        <div className="flex items-center gap-3 w-full h-15 rounded-lg px-5 bg-mute">
          <p className='surface font-bold'>
            92%
          </p>
          <p className='text-white'>
            رضا عام · ١٫٤ ألف مراجعة
          </p>
        </div>
      </div>
    </section>
  )
}