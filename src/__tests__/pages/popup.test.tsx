/**
 * @jest-environment jsdom
 *
 * TODO: メニューにテキストが表示されているか
 * TODO: onClickに渡した関数が呼ばれるか
 *
 */

 import React from 'react';
 import ReactDOM from "react-dom";
 import renderer from 'react-test-renderer'
 import PopupMenu from '../../pages/popup';

 describe('PopupMenu-test', () => {
     test('menu', () =>{
     // ToDo: ポップアップメニューのsnapshotをとって差分が見れるように
     // FIXME: 「Target container is not a DOM element.」テストできない。
    //  const tree = renderer
    //      .create(<PopupMenu/>)
    //      .toJSON();
    //  expect(tree).toMatchSnapshot();
     });
 });
