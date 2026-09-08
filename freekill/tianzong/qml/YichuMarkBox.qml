import QtQuick
import QtQuick.Layouts
import Fk
import LunarLtk
import LunarLtk.Components

ColumnLayout {
  id: root
  anchors.fill: parent
  property string name: ""
  property var value: []
  signal finish()

  BigGlowText {
    Layout.fillWidth: true
    Layout.preferredHeight: childrenRect.height + 4
    text: Lua.tr(root.name)
  }

  ListView {
    Layout.fillWidth: true
    Layout.fillHeight: true
    clip: true
    spacing: 8
    model: root.value
    delegate: Text {
      required property var modelData
      width: root.width
      color: "#E4D5A0"
      font.pixelSize: 18
      text: Lua.tr(modelData)
      wrapMode: Text.WordWrap
    }
  }
}
