import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, Input, Link, Text, useDisclosure, useNumberInput, VStack } from '@chakra-ui/react'
import { mdiAlarm, mdiCubeSend, mdiHeartOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { PostDetail } from 'src/models'
import { addToCart } from 'src/redux/slices/cart'
import { Image, Span } from 'src/styled-components'
import { LayoutPrice, OfferPrice, Price } from '../styled-components'
import { Accordion, ModalSize } from './components'
import { PostPhotos } from './components/PostPhotos'
import { fetchPostDetail } from './services'
import { AddToCart, ContainOffer, ContainRef, ContainSizes, Description, HelpSizes, LayoutAddToCart, LayoutInfo, LayoutPostDetail, LayoutSizes, Ref, Sizes, Title } from './styled-components'

const BreadCrumbNames: string[] = ["Movies", "Hombre", "Chaquetas y buzos", "Chaqueta género neutro, caqui con cierre de Mandalorian"]

export default function PostInfo() {
  const [data, setData] = useState<PostDetail>()
  const getPostDetail = async () => {
    try {
      const result = await fetchPostDetail()
      setData(result)
    } catch (error) {
      console.error("error get posts")
    }
  }

  useEffect(() => {
    getPostDetail()
  }, [])

  const dispatch = useDispatch()
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!data) return <Span>Cargando...</Span>
  return (
    <LayoutPostDetail>
      <VStack gap={4}>
        <Breadcrumb w="100%">
          {
            BreadCrumbNames.map((item, idx) => (
              <BreadcrumbItem key={item}>
                <BreadcrumbLink href='#' fontWeight={idx === BreadCrumbNames.length - 1 ? 700 : "normal"}>{item}</BreadcrumbLink>
              </BreadcrumbItem>
            ))
          }
        </Breadcrumb>
        <PostPhotos data={data.img} />
        <Flex w="100%" gap={4} color="blackAlpha.600" flexDir={["column", "column", "row"]}>
          <HStack w={["100%", "100%", "50%"]} justifyContent={["center", "center", "flex-end"]}>
            <Icon path={mdiCubeSend} size={1.3} />
            <Text>Envío <Text fontWeight={800} as="span">a toda Colombia</Text></Text>
          </HStack>
          <HStack w={["100%", "100%", "50%"]} justifyContent={["center", "center", "flex-start"]}>
            <Icon path={mdiAlarm} size={1} />
            <Text>Tiempo de entrega <Text fontWeight={800} as="span">3 a 7 días hábiles</Text></Text>
          </HStack>
        </Flex>
        <Text>{data.aditionalInfo}</Text>
      </VStack>
      <LayoutInfo>
        <Description>{data.description}</Description>
        <ContainRef>
          <Title>{data.title}</Title>
          <Ref>Ref. {data.id}</Ref>
          {
            data.offer && <ContainOffer>
              <Image alt='oferta especial' width={"115px"} src='https://moviesshopco.vtexassets.com/assets/vtex.file-manager-graphql/images/c3d3292a-eb7f-4210-9305-94ab1b369cdc___69c8241fec095c747e905c82e39695fc.gif' />
            </ContainOffer>
          }
        </ContainRef>
        <LayoutPrice>
          {
            data.offer && <OfferPrice size='1.5rem'>{`$${(data.price).toLocaleString('es')}`}</OfferPrice>
          }
          <Price size='1.7rem'>${data.offer ? (((100 - data.offer) / 100) * data.price).toLocaleString('es') : (data.price).toLocaleString('es')}</Price>
        </LayoutPrice>
        <LayoutSizes>
          <ContainSizes>
            {
              data.sizes.map(item => <Sizes key={item}>{item}</Sizes>)
            }
          </ContainSizes>
          <Button onClick={onOpen} variant="unstyled">
            <HelpSizes >Guía de tallas</HelpSizes>
          </Button>
          <ModalSize isOpen={isOpen} onClose={onClose} />
        </LayoutSizes>
        <LayoutAddToCart>
          <HStack maxW='120px' borderBottom={"1px solid"} borderColor="gray.300" height="50px">
            <Button {...dec} backgroundColor="transparent">-</Button>
            <Input {...input} border="none" />
            <Button {...inc} backgroundColor="transparent">+</Button>
          </HStack>
          <AddToCart secundary onClick={() => dispatch(addToCart({ post: data, quantity: Number(input.value) }))}>agregar a mi bolsa</AddToCart>
        </LayoutAddToCart>
        <Accordion data={data.info} />
        <Box borderBottom={"1px solid"} borderColor="gray.300" padding={2}>
          <Button leftIcon={<Icon path={mdiHeartOutline} size={1} />} variant="unstyled" textTransform={"uppercase"} display="flex" alignItems={"center"} _hover={{ color: "red" }} w="min-content">
            Agregar a favoritos
          </Button>
        </Box>
        <HStack gap={2} borderTop={"1px solid"} borderColor="gray.300" paddingBlock={4}>
          <Box backgroundColor={"#eb0627"} padding={2} borderRadius="4px">
            <Image src='https://moviesshopco.vtexassets.com/arquivos/logoBlanco_resize.png' alt='logo credifin' width={"125px"} />
          </Box>
          <VStack alignItems={"flex-start"} gap={0}>
            <Text letterSpacing={.2}>Compra ahora y págalo hasta en 6 cuotas con Credifin.</Text>
            <Link fontWeight={600}>Solicita aquí tu crédito.</Link>
          </VStack>
        </HStack>
      </LayoutInfo>
    </LayoutPostDetail>
  )
}
