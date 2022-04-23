import { TranslateFunction } from 'contexts/Localization/types'
import { SalesSectionProps } from '.'

export const swapSectionData = (t: TranslateFunction): SalesSectionProps => ({
  headingText: t('Trade anything. No registration, no hassle.'),
  bodyText: t('Trade any token on BNB Smart Chain in seconds, just by connecting your wallet.'),
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: t('Trade Now'),
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.bigswap.exchange/',
    text: t('Learn'),
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: '', alt: '' },
      { src: '', alt: '' }, 
    ],
  },
})

export const earnSectionData: SalesSectionProps = {
  headingText: 'Earn passive income with crypto.',
  bodyText: 'BigSwap makes your crypto work for you.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.bigswap.exchange/products/yield-farming',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: '', alt: '' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: 'BGSP makes our world go round.',
  bodyText:
    'BGSP token is the heart of the BigSwap ecosystem. Buy it, Farm it, Spend it, Stake it, you can even Vote with it!',
  reverse: false,
  primaryButton: {
    to: '/swap?outputCurrency=0xe9f861b22cd5240494ecc14afea02659ec59864f',
    text: 'Buy BGSP',
    external: false,
  },
  secondaryButton: {
    to: 'https://docs.bigswap.exchange/tokenomics/BGSP',
    text: 'Learn',
    external: true,
  },

  images: {
    path: '/images/home/cake/',
    attributes: [
      { src: '', alt: '' }, 
    ],
   },
} 
