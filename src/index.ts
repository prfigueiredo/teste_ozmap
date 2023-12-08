
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { createUser, updateUser, deleteUser, getUser } from './controllers/user.controller';
import { createRegion, updateRegion, deleteRegion, getRegion } from './controllers/region.controller';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Este é o teste técnico da OZmap!');
});

app.post('/users', createUser);
app.put('/users/:userId', updateUser);
app.delete('/users/:userId', deleteUser);
app.get('/users/:userId', getUser);

app.post('/regions', createRegion);
app.put('/regions/:regionId', updateRegion);
app.delete('/regions/:regionId', deleteRegion);
app.get('/regions/:regionId', getRegion);

mongoose.connect('mongodb://ozmap:27017/ozmap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}as ConnectOptions);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
