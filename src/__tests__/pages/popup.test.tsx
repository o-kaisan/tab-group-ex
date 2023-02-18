/**
 * @jest-environment jsdom
 */

import React from 'react'
import renderer from 'react-test-renderer'
import PopupMenu from '../../pages/popup'

describe('PopupMenu-test', () => {
  test('メニューの表示内容が正しいことのテスト', () => {
    const tree = renderer.create(<PopupMenu />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
