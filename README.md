# react-native-flatlist-header

![SliderBox](assets/demo.gif)

## Custom FlatlistHeader
> Component based 100% on React-Native's own Flatlist

| Props | Value Type | Description | Default |
|--|--|--|--|
| navBar | Number | Size the Nav bar should be when scrolling up | 79 |
| height | Number | Size at which the component must occupy when scrolling down  | 150 |
| image | Image path to be used | require if image local or {uri: url} from image web | null |
| imageSize | Sets value for image size with end navBar | Number | 35 |
| marginImage | Number | fine adjustments to the image left when scrolling up | 280 |
| rightItem | Component RN | If you want to insert a component in the right corner | null |
| color | Color Hexadecimal | Component background color | #333 |

## Install
> npm i react-native-flatlist-header

## Usage :
### 1- add below import in your code :
```js
import { FlatlistHeader } from "react-native-flatlist-header";
```
### 2- Define the props according to the documentation above or copy the example below.

```js
<FlatlistHeader
   data={data}
   renderItem={({item}) => <Item item={item} />}
   keyExtractor={item  =>  item.id}
   
   rightItem={<Icon type='Feather' name='bell' />}
   image={require('./src/assets/logo.png')}
   navBar={80}
   height={150}
   color={'#d13636'}
   marginImage={270}
/>
```
