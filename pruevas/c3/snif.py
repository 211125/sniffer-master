from scapy.layers.l2 import Ether
from scapy.all import *

def packet_callback(packet):
    if packet.haslayer(Ether):
        src_mac = packet[Ether].src
        dst_mac = packet[Ether].dst
        print("Source MAC: {}, Destination MAC: {}".format(src_mac, dst_mac))

sniff(prn=packet_callback, filter="ether")
