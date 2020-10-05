import styled from '@emotion/styled';
import firebase from 'firebase';
import Moment from 'react-moment';
import { useSession } from '../../hooks/auth';
import { useStore } from '../../hooks/store';
import { color_background, color_border } from '../../styles/colors';
import { Statuses } from './statuses';

const Card = styled.div((props) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: color_background,
  padding: 10,
  border: `1px solid ${color_border}`,
  borderRadius: 4,
  gap: 10,
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
}) {
  const { user }: any = useSession();
  const { getTeaFlavorbyId }: any = useStore();
  return (
    <Card status={status}>
      <CardContent>
        <Image src={item?.image} />
        <Content>
          <h3>
            {item?.name}{' '}
            {details?.teaId && `- (${getTeaFlavorbyId(details?.teaId).name})`}
          </h3>
          <small>
            {Statuses[status]} - {name} -{' '}
            <Moment interval={1000} fromNow>
              {meta?.createdAt}
            </Moment>{' '}
          </small>
        </Content>
        {status === 'complete' ? null : status === 'ordered' ? (
          <a
            onClick={() => {
              firebase.firestore().collection(`orders`).doc(id).update({
                'meta.updatedAt': new Date().valueOf(),
                'meta.completedAt': new Date().valueOf(),
                status: 'inProgress',
                completedBy: user,
              });
            }}
          >
            Set In Progress
          </a>
        ) : (
          <a
            onClick={() => {
              firebase.firestore().collection(`orders`).doc(id).update({
                'meta.updatedAt': new Date().valueOf(),
                'meta.completedAt': new Date().valueOf(),
                status: 'complete',
                completedBy: user,
              });
            }}
          >
            Mark Complete
          </a>
        )}
      </CardContent>
      <p>
        Name: <b>{name}</b>
      </p>
      {special && <p>Special: {special}</p>}
    </Card>
  );
}
