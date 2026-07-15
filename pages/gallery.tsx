import { GetServerSideProps } from 'next'

export default function GalleryRedirect() {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/services',
      permanent: true
    }
  }
}
