import styled from '@emotion/styled';
import firebase from 'firebase';
import Moment from 'react-moment';
import { useSession } from '../../hooks/auth';
import { useStore } from '../../hooks/store';
import { color_background, color_border } from '../../styles/colors';
import { Statuses } from './statuses';

const Card = styled.div((props) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: color_background,
  padding: 10,
  border: `1px solid ${color_border}`,
  borderRadius: 4,
  h5: { margin: 0 },
  h4: { margin: 0 },
}));

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

export default function OrderedItem({ id, item, details, meta, name, status }) {
  const { user }: any = useSession();
  const { getTeaFlavorbyId }: any = useStore();
  return (
    <Card status={status}>
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
      {status === 'complete' ? (
        <h4>{name}</h4>
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
    </Card>
  );
}
