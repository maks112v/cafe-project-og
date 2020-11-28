import styled from '@emotion/styled';
import firebase from 'firebase';
import Moment from 'react-moment';
import { useSession } from '../../hooks/auth';
import { useStore } from '../../hooks/store';
import { color_background, color_border } from '../../styles/colors';
import { Statuses } from './statuses';

const Card = styled.div((props) => ({
  display: 'grid',
  backgroundColor: color_background,
  padding: 10,
  border: `1px solid ${color_border}`,
  borderRadius: 4,
  gap: 15,
  p: { margin: 0 },
  h5: { margin: 0 },
  h4: { margin: 0 },
}));

const CardContent = styled.div({
  display: 'flex',
  alignItems: 'center',
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

export default function OrderedItem({
  id,
  item,
  special,
  details,
  meta,
  name,
  status,
  phone,
  inProgressBy,
  completedBy,
}) {
  const { user }: any = useSession();
  const {
    getTeaFlavorbyId,
    getSyrupFlavorsbyId,
    getSyrupAmountbyId,
  }: any = useStore();
  return (
    <Card status={status}>
      <CardContent>
        <Image src={item?.image} />
        <Content>
          <h3>{item?.name} </h3>
          <small>
            {Statuses[status]} -{' '}
            <Moment interval={1000} fromNow>
              {meta?.createdAt}
            </Moment>{' '}
          </small>
        </Content>
        {status === 'complete' ? null : status === 'ordered' ? (
          <a
            onClick={async () => {
              await firebase.firestore().collection(`orders`).doc(id).update({
                'meta.updatedAt': new Date().valueOf(),
                'meta.inProgress': new Date().valueOf(),
                status: 'inProgress',
                inProgressBy: user,
              });
            }}
          >
            Set In Progress
          </a>
        ) : (
          <a
            onClick={async () => {
              await firebase.firestore().collection(`orders`).doc(id).update({
                'meta.updatedAt': new Date().valueOf(),
                'meta.completedAt': new Date().valueOf(),
                status: 'complete',
                completedBy: user,
              });
              if (phone) {
                await firebase
                  .firestore()
                  .collection(`notifs`)
                  .add({
                    'meta.updatedAt': new Date().valueOf(),
                    'meta.completedAt': new Date().valueOf(),
                    item,
                    phone,
                    orderRef: firebase.firestore().collection(`orders`).doc(id),
                  });
              }
            }}
          >
            Mark Complete
          </a>
        )}
      </CardContent>
      <p>
        Name: <b>{name}</b>
      </p>
      {details?.teaId && (
        <p>Tea Flavor: {getTeaFlavorbyId(details?.teaId)?.name || 'Any'}</p>
      )}
      {details?.syrupId && (
        <p>Flavor: {getSyrupFlavorsbyId(details?.syrupId)?.name || 'Any'}</p>
      )}
      {details?.syrupAmount && (
        <p>{getSyrupAmountbyId(details?.syrupAmount)?.amount || 'Any'} Pump</p>
      )}
      {special && <p>Special: {special}</p>}
      {inProgressBy?.name && !completedBy ? (
        <>
          <p>In Progress By: {inProgressBy?.name}</p>
          <p>
            In Progress Time:
            <Moment interval={1000} fromNow>
              {meta?.inProgress}
            </Moment>
          </p>
        </>
      ) : null}
      {completedBy?.name && (
        <>
          <p>Completed By: {completedBy?.name}</p>
          <p>
            Completed{' '}
            <Moment interval={1000} from={meta?.inProgress}>
              {meta?.completedAt}
            </Moment>
          </p>
        </>
      )}
    </Card>
  );
}
