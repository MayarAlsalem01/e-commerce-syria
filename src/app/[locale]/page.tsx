
import Container from "@/components/ui/Container";

import Section from "@/features/home/components/Section";
import SpecialProductCard from "@/features/home/components/SpecialProductCard";
import { CarouselSize } from "@/components/HomeCarousel/CarouselSize";

import BestSeller from "@/features/home/components/BestSeller";
import { CarouselItem } from "@/components/ui/carousel";
import { getTranslations } from "next-intl/server";
import getUserSession from "@/lib/auth/getUserSession";
export const revalidate = 0
export default async function Home() {
  const s = await getUserSession()
  const t = await getTranslations('HomePage')

  console.log(s?.user)
  return (
    <div className="mb-10">
      <Container>
        {
          s?.user ? <Section title={t('SpecialForYou')}>
            <div className=" w-full flex justify-center overflow-hidden mt-5">
              <CarouselSize className="">
                {
                  Array.from({ length: 5 }).map((_, i) => (
                    <CarouselItem key={i} className="basis-[90%] md:basis-[40%] lg:basis-[28%] xl:basis-[26%] select-none">
                      <SpecialProductCard />
                    </CarouselItem>
                  ))
                }
              </CarouselSize>
            </div>
          </Section> : undefined
        }

        {/* <Section title="Category">
          <CarouselSize className="basis-[40%] md:basis-[22%] lg:basis-[15.3%] xl:basis-[11.7%]">
            <HomeCategory />

          </CarouselSize>
        </Section> */}
        <Section title={t('bestSeller')}>
          <BestSeller />
        </Section>
      </Container>

    </div>
  );
}
