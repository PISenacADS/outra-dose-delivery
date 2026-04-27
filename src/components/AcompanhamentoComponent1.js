import * as React from "react";
// 1. Adicionei o 'Image' aqui na importação para o ícone do WhatsApp funcionar
import { StyleSheet, View, Text, Image } from "react-native";
import BeerStein1 from "../../assets/images/BeerStein.svg";
import CheckFat1 from "../../assets/images/CheckFat.svg";
import BeerStein2 from "../../assets/images/BeerStein.svg";
import ClockCountdown from "../../assets/images/ClockCountdown.svg";

const AcompanhamentoComponent1 = () => {
  return (
    <View style={styles.acompanhemntoDoPedidoInner}>
      <View style={styles.frameParent}>
        <View style={styles.beersteinParent}>
          <BeerStein1
            style={[styles.beersteinIcon, styles.beersteinIconLayout]}
            width={32}
            height={32}
          />
          <View style={styles.checkIcon}>
            <CheckFat1 style={styles.checkfatIcon} width={25} height={20} />
          </View>
          <View style={styles.pedidoConfirmadoWrapper}>
            <Text style={[styles.pedidoConfirmado, styles.aCaminhoTypo]}>
              Pedido Confirmado
            </Text>
          </View>
        </View>
        <View style={[styles.itemDisplay, styles.displayLayout]}>
          <View style={[styles.beverageDisplay, styles.displayLayout]}>
            <View style={styles.iconPair}>
              <View style={styles.iconPairContainer}>
                <View style={styles.firstPair}>
                  <BeerStein1
                    style={[styles.beersteinIcon, styles.beersteinIconLayout]}
                    width={32}
                    height={32}
                  />
                  <View style={styles.firstPairCheck}>
                    <CheckFat1
                      style={styles.checkfatIcon}
                      width={25}
                      height={20}
                    />
                  </View>
                </View>
                <View
                  style={[styles.secondPairBeer, styles.secondPairBeerFlexBox]}
                >
                  <BeerStein2
                    style={[styles.beersteinIcon3, styles.beersteinIconLayout]}
                    width={32}
                    height={31}
                  />
                  <View style={styles.checkfatWrapper}>
                    <CheckFat1
                      style={styles.checkfatIcon}
                      width={25}
                      height={20}
                    />
                  </View>
                </View>
                <View style={styles.firstPair2}>
                  <BeerStein1
                    style={[styles.beersteinIcon, styles.beersteinIconLayout]}
                    width={32}
                    height={32}
                  />
                  <View style={styles.checkfatContainer}>
                    <CheckFat1
                      style={styles.checkfatIcon}
                      width={25}
                      height={20}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.statusUpdate, styles.needHelpLayout]}>
              <View style={[styles.timeEstimation, styles.timeLayout]}>
                <View style={styles.timeDetails}>
                  <View style={styles.statusLabel}>
                    <Text style={[styles.emPreparao, styles.aCaminhoTypo]}>
                      Em Preparação
                    </Text>
                    <Text style={[styles.aCaminho, styles.aCaminhoTypo]}>
                      A Caminho
                    </Text>
                  </View>
                </View>
                <View style={[styles.timeClock, styles.timeLayout]}>
                  <View style={styles.arrivalTime}>
                    <Text
                      style={[styles.tempo, styles.tempoTypo]}
                    >{` TEMPO `}</Text>
                    <Text style={[styles.estimado, styles.estimadoTypo]}>
                      ESTIMADO
                    </Text>
                    <ClockCountdown
                      style={styles.clockcountdownIcon}
                      width={54}
                      height={56}
                    />
                  </View>
                  <View style={styles.deliveryConfirmation}>
                    <Text style={[styles.assistanceDetails, styles.tempoTypo]}>
                      10:58:02
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.needHelp}>
                <View style={styles.contactSupport}>
                  <Text style={[styles.entregue, styles.aCaminhoTypo]}>
                    Entregue
                  </Text>
                  
                  <View style={styles.botaoAjuda}>
                    <Text style={styles.precisaDeAjuda}>
                      Precisa de ajuda?
                    </Text>
                  </View>
                </View>
                <Image
                  style={styles.zap2RemovebgPreview1Icon}
                  resizeMode="contain"
                  source={require("../../assets/images/zap2-removebg-preview-1.png")}
                />
              </View>

            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  beersteinIconLayout: {
    width: 32,
    zIndex: 1,
  },
  aCaminhoTypo: {
    textAlign: "left",
    fontFamily: "Inter",
    fontSize: 15,
    color: "#fff",
    zIndex: 1,
  },
  displayLayout: {
    height: 190,
    zIndex: null,
  },
  secondPairBeerFlexBox: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  needHelpLayout: {
    width: 313,
    alignItems: "flex-end",
  },
  timeLayout: {
    height: 116,
    zIndex: null,
  },
  tempoTypo: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    color: "#a9981b",
    fontSize: 25,
    height: 32,
  },
  estimadoTypo: {
    zIndex: 2,
    fontFamily: "Acme",
    textAlign: "left",
  },
  acompanhemntoDoPedidoInner: {
    width: "100%",
    paddingLeft: 12,
    flexDirection: "row",
    height: 223,
  },
  frameParent: {
    gap: 1,
    zIndex: null,
    width: "100%",
    height: 223,
  },
  beersteinParent: {
    width: 211,
    gap: 8,
    zIndex: 1,
    height: 32,
    flexDirection: "row",
  },
  beersteinIcon: {
    zIndex: 1,
    height: 32,
  },
  checkIcon: {
    height: 27,
    paddingTop: 7,
    width: 25,
  },
  checkfatIcon: {
    height: 20,
    width: 25,
    zIndex: 1,
  },
  pedidoConfirmadoWrapper: {
    width: 138,
    paddingTop: 13,
    height: 32,
  },
  pedidoConfirmado: {
    width: 141,
    height: 19,
    fontFamily: "Inter",
    fontSize: 15,
  },
  itemDisplay: {
    paddingLeft: 2,
    width: "100%",
    flexDirection: "row",
  },
  beverageDisplay: {
    width: "100%",
    flexDirection: "row",
  },
  iconPair: {
    height: 143,
    paddingTop: 16,
    width: 63,
    zIndex: null,
  },
  iconPairContainer: {
    height: 127,
    gap: 16,
    width: 63,
    zIndex: null,
  },
  firstPair: {
    width: 61,
    gap: 4,
    zIndex: 1,
    height: 32,
    flexDirection: "row",
  },
  firstPairCheck: {
    height: 23,
    paddingTop: 3,
    width: 25,
  },
  secondPairBeer: {
    width: 60,
    gap: 3,
    height: 31,
    zIndex: 1,
  },
  beersteinIcon3: {
    height: 31,
    zIndex: 1,
  },
  checkfatWrapper: {
    height: 22,
    paddingBottom: 2,
    justifyContent: "flex-end",
    width: 25,
  },
  firstPair2: {
    gap: 6,
    width: 63,
    zIndex: 1,
    height: 32,
    flexDirection: "row",
  },
  checkfatContainer: {
    height: 26,
    paddingTop: 6,
    width: 25,
  },
  statusUpdate: {
    gap: 2,
    marginLeft: -4,
    height: 190,
    zIndex: null,
  },
  timeEstimation: {
    width: 301,
    gap: 78,
    alignItems: "flex-end",
    flexDirection: "row",
  },
  timeDetails: {
    height: 89,
    paddingBottom: 23,
    width: 109,
    justifyContent: "flex-end",
    zIndex: null,
  },
  statusLabel: {
    height: 66,
    gap: 28,
    width: 109,
    zIndex: 1,
  },
  emPreparao: {
    width: 112,
    height: 19,
    fontFamily: "Inter",
    fontSize: 15,
  },
  aCaminho: {
    width: 81,
    height: 19,
    fontFamily: "Inter",
    fontSize: 15,
  },
  timeClock: {
    gap: 52,
    width: 114,
  },
  arrivalTime: {
    width: 114,
    zIndex: 1,
    height: 32,
    flexDirection: "row",
  },
  tempo: {
    width: 96,
    top: -26,
    right: 1,
    fontFamily: "Acme",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    color: "#a9981b",
    fontSize: 25,
    textAlign: "left",
    zIndex: 1,
    position: "absolute",
  },
  estimado: {
    width: 117,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    color: "#a9981b",
    fontSize: 25,
    height: 32,
    zIndex: 2,
  },
  clockcountdownIcon: {
    height: 56,
    width: 54,
    bottom: -51,
    left: 27,
    zIndex: 3,
    position: "absolute",
  },
  deliveryConfirmation: {
    width: 98,
    paddingLeft: 10,
    zIndex: 1,
    height: 32,
    flexDirection: "row",
  },
  assistanceDetails: {
    width: 91,
    fontFamily: "Acme",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    color: "#a9981b",
    fontSize: 25,
    textAlign: "left",
    zIndex: 1,
  },

  needHelp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    zIndex: 3,
  },
  contactSupport: {
    flex: 1,
    gap: 8,
    paddingLeft: 10, 
  },
  entregue: {
    marginLeft: 5,
  },
  botaoAjuda: {
    backgroundColor: "#af4706",
    borderRadius: 56,
    height: 45,
    width: "95%",
    justifyContent: "center", 
    alignItems: "center",     
  },
  precisaDeAjuda: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Acme",
  },
  zap2RemovebgPreview1Icon: {
    height: 60,
    width: 60,
    zIndex: 3,
  },
});

export default AcompanhamentoComponent1;