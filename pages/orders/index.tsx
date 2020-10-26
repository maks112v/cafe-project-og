import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import Moment from "react-moment";
import Button from "../../components/Button";
import { Statuses } from "../../components/OrderedItem/statuses";
import Seo from "../../components/Seo";
import { withAuth } from "../../hooks/auth";
import { useStore } from "../../hooks/store";
import { color_background, color_border } from "../../styles/colors";
import { Container } from "../../styles/Container";
import { ContentWrapper } from "../../styles/ContentWrapper";

const Card = styled.div({
  display: "flex",
  alignItems: "center",
  backgroundColor: color_background,
  padding: 10,
  border: `1px solid ${color_border}`,
  cursor: "pointer",
  borderRadius: 4,
  h5: { margin: 0 },
});

const Content = styled.div({
  margin: `0 10px`,
  flexGrow: 1,
  h3: {
    margin: 0,
  },
});

const Image = styled.img({
  width: 50,
  height: 50,
});

const TitleWrapper = styled.div({
  display: "flex",
  alignItems: "center",
  margin: `50px 0 20px`,
  h1: {
    margin: 0,
    flexGrow: 1,
  },
});

const Avatar = styled.img({
  width: 50,
  height: 50,
  borderRadius: 100,
});

const CenterLink = styled.div({
  width: "100%",
  textAlign: "center",
  cursor: "pointer",
});

const OrderDetails: FunctionComponent = () => {
  const { orders, getDrinkbyId, getTeaFlavorbyId }: any = useStore();
  const router = useRouter();

  return (
    <Container>
      <Seo titles={["Orders"]} />
      <h1>All Orders</h1>
      <ContentWrapper>
        <Link href="/">
          <Button>Back to Menu</Button>
        </Link>
        {orders?.map((order) => (
          <Link href="/orders/[id]" as={`/orders/${order?.id}`}>
            <Card>
              <Image src={order?.item?.image} />
              <Content>
                <h3>
                  {order?.item?.name}{" "}
                  {order?.details?.teaId &&
                    `- (${
                      getTeaFlavorbyId(order?.details?.teaId)?.name || "Any"
                    })`}
                </h3>
                <Moment interval={30000} fromNow>
                  {order?.meta?.createdAt}
                </Moment>
              </Content>
              <h5>{Statuses[order?.status]}</h5>
            </Card>
          </Link>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default withAuth(OrderDetails);
