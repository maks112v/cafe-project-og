import styled from "@emotion/styled";
import firebase from "firebase";
import { Form, Formik } from "formik";
import Router from "next/router";
import { useState } from "react";
import * as yup from "yup";
import Button from "../components/Button";
import InputField from "../components/InputField";
import OrderItem from "../components/OrderItem";
import Orders from "../components/Orders";
import Seo from "../components/Seo";
import { useSession } from "../hooks/auth";
import { useStore } from "../hooks/store";
import { Container } from "../styles/Container";

const CardWrapper = styled.div({
  display: "grid",
  gap: 20,
  gridTemplateColumns: `repeat(auto-fill, minmax(200px, 1fr))`,
});

const ItemCard = styled.div({});

const StyledForm = styled(Form)({
  display: "grid",
  gap: 20,
});

const ResetButton = styled.div({
  textAlign: "center",
});

const schema = yup.object().shape({
  name: yup.string().required("Please add your name"),
});

function Home() {
  const {
    selectableDrinks,
    getDrinkbyId,
    teaFlavors,
    syrupFlavors,
    syrupAmount,
  }: any = useStore();
  const { auth, user }: any = useSession();
  const [selectedDrink, setSelectedDrink] = useState(null);

  async function handleSubmit(values) {
    try {
      let userId;
      if (auth) {
        userId = auth?.uid;
      } else {
        const res = await firebase.auth().signInAnonymously();
        await firebase
          .firestore()
          .collection(`users`)
          .doc(res?.user?.uid)
          .set({ name: values?.name }, { merge: true });
        userId = res?.user?.uid;
      }
      const orderRes = await firebase
        .firestore()
        .collection(`orders`)
        .add({
          item: getDrinkbyId(selectedDrink),
          ...values,
          status: "ordered",
          userId,
          meta: {
            createdAt: new Date().valueOf(),
            updatedAt: new Date().valueOf(),
          },
        });
      setSelectedDrink(null);
      Router.push("/orders/[id]", `/orders/${orderRes.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Seo titles={["Order"]} />
      <Container>
        {!selectedDrink && <Orders />}
        <h1>New Order</h1>
        <p>Click on a drink to place an order.</p>
        {selectedDrink ? (
          <Formik
            validationSchema={schema}
            initialValues={{ name: user?.name || "" }}
            onSubmit={handleSubmit}
          >
            <StyledForm>
              <OrderItem {...getDrinkbyId(selectedDrink)} />
              <InputField autofocus name="name" placeholder="Name" />
              {selectedDrink === "e3yqr9fn31" && (
                <InputField
                  name="details.teaId"
                  as="select"
                  placeholder="Tea Flavor"
                >
                  <option>Select Tea Flavor</option>
                  {teaFlavors?.map(({ name, id, details }) => (
                    <option value={id}>
                      {name} - {details}
                    </option>
                  ))}
                </InputField>
              )}
              {selectedDrink !== "e3yqr9fn31" && (
                <div>
                  <InputField
                    name="details.syrupId"
                    as="select"
                    placeholder="Syrup Flavor"
                  >
                    <option>Select Syrup Flavor</option>
                    {syrupFlavors?.map(({ name, id }) => (
                      <option value={id}>{name}</option>
                    ))}
                  </InputField>
                  <br></br>
                  <InputField
                    name="details.syrupAmount"
                    as="select"
                    placeholder="Syrup Pumps"
                  >
                    <option>Syrup Pumps</option>
                    {syrupAmount?.map(({ amount, id }) => (
                      <option value={id}>{amount}</option>
                    ))}
                  </InputField>
                </div>
              )}
              <InputField name="special" placeholder="Special Instructions" />
              {/* <InputField name='name' placeHolder='Name' required /> */}
              <Button type="submit">Place Order</Button>
              <ResetButton>
                <a
                  onClick={() => {
                    if (window.confirm("Restart Order?")) {
                      setSelectedDrink(null);
                    }
                  }}
                >
                  Start Over
                </a>
              </ResetButton>
            </StyledForm>
          </Formik>
        ) : (
          <CardWrapper>
            {selectableDrinks
              ?.filter((data) => data?.available)
              ?.map((data) => (
                <OrderItem
                  {...data}
                  onClick={() => setSelectedDrink(data?.id)}
                />
              ))}
          </CardWrapper>
        )}
      </Container>
    </>
  );
}

export default Home;
